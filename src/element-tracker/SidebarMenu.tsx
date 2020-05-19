import React, { useState, useLayoutEffect } from "react"

import styled from "styled-components"

import { useElementTracker } from "@cs125/element-tracker"
import { List } from "semantic-ui-react"

import { active } from "./active"

const HoverItem = styled(List.Item)`
  :hover {
    cursor: pointer;
  }
`

export const SidebarMenu: React.FC = () => {
  const { components } = useElementTracker()
  const [activeHeader, setActiveHeader] = useState<string | undefined>(undefined)

  useLayoutEffect(() => {
    if (!components || components.length === 0) {
      setActiveHeader(undefined)
      return
    }
    const activeHeader = active(
      components
        .filter(c => c.tag === "h2")
        .map(c => {
          return { ...c, active: false }
        })
    )
    setActiveHeader(activeHeader && activeHeader.id)
  }, [components])

  if (!components) {
    return null
  }
  return (
    <List size="large">
      {components
        .filter(c => c.tag === "h2")
        .map((component, i) => {
          const headerLocation = `${window.location.href.split("#")[0]}#${component.id}`
          return (
            <HoverItem
              onClick={(): void => {
                window.location.href = headerLocation
              }}
              key={i}
            >
              {activeHeader && component.id && component.id === activeHeader ? (
                <strong onClick={(): void => setActiveHeader(component.id)}>{component.text}</strong>
              ) : (
                <span onClick={(): void => setActiveHeader(component.id)}>{component.text}</span>
              )}
            </HoverItem>
          )
        })}
    </List>
  )
}
