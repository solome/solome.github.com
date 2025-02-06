/* ---------- 基础关系 ---------- */
father(Father, Child) :- 
    parent(Father, Child), 
    male(Father).

mother(Mother, Child) :- 
    parent(Mother, Child), 
    female(Mother).

sibling(S1, S2) :- 
    parent(P, S1), 
    parent(P, S2), 
    S1 \= S2.

brother(Brother, Person) :- 
    sibling(Brother, Person), 
    male(Brother).

sister(Sister, Person) :- 
    sibling(Sister, Person), 
    female(Sister).

/* ---------- 中式宗法称谓规则 ---------- */
% 直系尊亲
称呼(Self, Relative, '祖父') :- 
    father(Father, Self), 
    father(Relative, Father).

称呼(Self, Relative, '祖母') :- 
    father(Father, Self), 
    mother(Relative, Father).

% 父辈兄弟及其子女（堂亲）
称呼(Self, Relative, '伯父') :- 
    father(Father, Self), 
    brother(Relative, Father), 
    older(Relative, Father).

称呼(Self, Relative, '叔父') :- 
    father(Father, Self), 
    brother(Relative, Father), 
    younger(Relative, Father).

称呼(Self, Relative, '堂兄') :- 
    father(Father, Self), 
    brother(Uncle, Father), 
    son(Relative, Uncle), 
    older(Relative, Self).

% 母系亲属（外亲）
称呼(Self, Relative, '外祖父') :- 
    mother(Mother, Self), 
    father(Relative, Mother).

称呼(Self, Relative, '外祖母') :- 
    mother(Mother, Self), 
    mother(Relative, Mother).

称呼(Self, Relative, '表妹') :- 
    mother(Mother, Self), 
    sister(Aunt, Mother), 
    daughter(Relative, Aunt), 
    younger(Relative, Self).

% 特殊案例：林黛玉与贾宝玉关系
称呼(贾宝玉, 林黛玉, '表妹') :- 
    mother(王夫人, 贾宝玉), 
    sister(贾敏, 王夫人), 
    daughter(林黛玉, 贾敏).

% 薛宝钗与贾宝玉关系（姨表亲）
称呼(贾宝玉, 薛宝钗, '表姐') :- 
    mother(王夫人, 贾宝玉), 
    sister(薛姨妈, 王夫人), 
    daughter(薛宝钗, 薛姨妈), 
    older(薛宝钗, 贾宝玉).

