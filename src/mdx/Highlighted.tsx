import React from "react"
import PropTypes from "prop-types"

import Children from "react-children-utilities"

import PrismLight from "react-syntax-highlighter/dist/esm/prism-light"
import style from "react-syntax-highlighter/dist/esm/styles/prism/tomorrow"
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash"
PrismLight.registerLanguage("bash", bash)
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx"
PrismLight.registerLanguage("tsx", tsx)

interface HighlightedProps {
  className?: string
  fontSize?: string
  children: React.ReactNode
}
export const Highlighted: React.FC<HighlightedProps> = ({ className, fontSize, children }) => {
  const language = className?.replace(/language-/, "") || ""
  const contents = Children.onlyText(children).trim()
  return (
    <PrismLight style={style} language={language} customStyle={{ fontSize }}>
      {contents}
    </PrismLight>
  )
}
Highlighted.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}
Highlighted.defaultProps = {
  className: "",
  fontSize: "0.9rem",
}
