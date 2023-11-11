import * as React from "react"

import './ColorItem.css'

export interface ColorItemProps {
  name: string
  color: string
  deep?: boolean
  onClick?: (color: string, deep?: boolean) => void
}

export function ColorItem(props: ColorItemProps) {
  return <div className={"color-item" + (props.deep ? ' color-item--deep' : '')}
    style={{ background: props.color }}
    onClick={() => props.onClick && props.onClick(props.color, props.deep)}
    >
    <div className="color-item-name">{props.name}</div>
    <div className="color-item-value">{props.color}</div>
  </div>
}
