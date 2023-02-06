import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppSetting from "../../config";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import FlexBox from "../ui/FlexBox";
import { login } from "../../store/actions/authActions";

const GoogleLogin = () => {
  useEffect(() => {
    gapi.load("client:auth2", async () => {
      await gapi.client.init({
        clientId: AppSetting.GOOGLE_CLIENT_ID,
        scope: "profile email",
      });

      const auth2 = gapi.auth2.getAuthInstance();
      auth2.isSignedIn.listen(onSignIn);
    });
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSignIn = async (isSignedIn) => {
    if (isSignedIn) {
      const googleUser = gapi.auth2.getAuthInstance().currentUser.get();
      const id_token = googleUser.getAuthResponse().id_token;
      dispatch(login({ id_token: id_token }))
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch(() => {
          gapi.auth2.getAuthInstance().signOut();
        });
    }
  };

  const handleLogin = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  return (
    <FlexBox
      styles={{
        justifyContent: "center",
        mt: 2,
      }}
    >
      <Button
        variant="outlined"
        color="primary"
        margin="normal"
        size="large"
        onClick={handleLogin}
        startIcon={<GoogleIcon size="large" color="primary" />}
      >
        Login with Google
      </Button>
    </FlexBox>
  );
};

export default GoogleLogin;
