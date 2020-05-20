import React, { useState, useRef, useEffect } from "react"

import { randomParagraphs } from "./randomParagraphs"

const Appearer: React.FC = () => {
  const content = useRef(randomParagraphs(6))
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, 1000)
    return (): void => {
      clearTimeout(timer)
    }
  }, [])
  return visible ? (
    <>
      <h2 id="appearer">Appearer</h2>
      <p>{content.current}</p>
    </>
  ) : null
}
export default Appearer
