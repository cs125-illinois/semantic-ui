import React from "react"
import PropTypes from "prop-types"

export interface LeadProps {
  fontSize?: string
  children: React.ReactNode
}
export const Lead: React.FC<LeadProps> = ({ fontSize, children }) => {
  return <div style={{ fontSize }}>{children}</div>
}
Lead.propTypes = {
  fontSize: PropTypes.string,
  children: PropTypes.node.isRequired,
}
Lead.defaultProps = {
  fontSize: "1.2rem",
}
