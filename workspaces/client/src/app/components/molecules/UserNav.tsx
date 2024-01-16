import { useAuth0 } from "@auth0/auth0-react";
import { Authenticated } from "lib/auth/Authenticated";

export const UserNav = () => {
  const { user, logout } = useAuth0();
  return (
    <Authenticated>
      <ul>
        <li>
          <small>{user?.nickname}</small>
        </li>
        <li>
          <button
            type="button"
            className="outline secondary"
            onClick={() => logout()}
          >
            Log out
          </button>
          <span
            role="button"
            tabIndex={0}
            className="outline secondary"
            onClick={() => logout()}
          >
            Log out
          </span>
        </li>
      </ul>
    </Authenticated>
  );
};
