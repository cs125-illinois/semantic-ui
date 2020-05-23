import React, { useEffect, useState } from "react"

export const SSRTest: React.FC = () => {
  const [serverContent, setServerContent] = useState<string | undefined>(undefined)
  useEffect(() => {
    setServerContent(document.getElementById("ssr")?.innerHTML)
  }, [])
  if (!serverContent) {
    return <div id="ssr">SSR</div>
  } else {
    return <div dangerouslySetInnerHTML={{ __html: serverContent }}></div>
  }
}
