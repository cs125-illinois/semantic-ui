import React, { useState, useCallback } from "react"
import { withGoogleLogin } from "@cs125/react-google-login"

import { Button, ButtonProps } from "semantic-ui-react"
import { FaGoogle } from "react-icons/fa"

export const LoginButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { ready, auth, isSignedIn } = withGoogleLogin()
  const [busy, setBusy] = useState<boolean>(false)

  const loginOrOut = useCallback(
    (isSignedIn: boolean | undefined) => async (): Promise<void> => {
      if (!auth) {
        return
      }
      setBusy(true)
      try {
        await (!isSignedIn ? auth.signIn() : auth.signOut())
      } finally {
        setBusy(false)
      }
    },
    [auth, setBusy]
  )

  return (
    <Button
      positive={!isSignedIn}
      loading={!ready || busy}
      disabled={!ready}
      onClick={loginOrOut(isSignedIn)}
      {...props}
    >
      {!isSignedIn ? (
        <>
          <FaGoogle style={{ paddingTop: "0.1em" }} /> Login
        </>
      ) : (
        <div style={{ padding: "0.1em 0.3em" }}>Logout</div>
      )}
    </Button>
  )
}
