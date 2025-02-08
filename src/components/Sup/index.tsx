import React from "react";
import { Popover } from "antd";

import "./index.css";

export const Sup: React.FC<{ remark: string; children: React.ReactNode }> = ({
  remark,
  children,
}) => {

  const ref = React.useRef()

  return (
    <span ref={ref}>
      {children}
      <Popover
        content={
          <div className="markdown-sup--content">
            <span>{children}</span>：{remark}
          </div>
        }
        title={<span className="markdown-sup--title"></span>}
        trigger="hover"
        getPopupContainer={(triggerNode) => ref.current}
      >
        <sup className="markdown-sup"></sup>
      </Popover>
    </span>
  );
};
