import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../routes";
import { selectStateChange } from "../redux/selectors";
import { authStateChangeUser } from "../redux/auth/authOperations";

export const Main = () => {
  const stateChange = useSelector(selectStateChange);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(stateChange);

  return (
    <NavigationContainer independent={true}>{routing}</NavigationContainer>
  );
};
