import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Link } from "./Link";
import { Route } from "./Route";
import { Router } from "./Router";
import { useParam } from "./useParam";

describe("Router", () => {
  it("renders the children of a matched route", () => {
    render(
      <Router initialPath="/router/test">
        <Route path="/router/test">Hello</Route>
      </Router>
    );

    expect(screen.queryByText("Hello")).toBeInTheDocument();
  });

  it("does not render the children of a non-matched route", () => {
    render(
      <Router initialPath="/router/test">
        <Route path="/router/notest">Hello</Route>
      </Router>
    );

    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });

  it("provides the matched params", () => {
    const TestComponent = () => {
      expect(useParam("username")).toEqual("foo");
      expect(useParam("action")).toEqual("bar");
      return null;
    };

    render(
      <Router initialPath="/user/foo/bar">
        <Route path="/user/:username/:action">
          <TestComponent />
        </Route>
      </Router>
    );
  });

  it("provides an empty string if useParam is called with a parameter that's not in the match", () => {
    const TestComponent = () => {
      expect(useParam("foo")).toEqual("");
      return null;
    };

    render(
      <Router initialPath="/user/foo/bar">
        <Route path="/user/foo/bar">
          <TestComponent />
        </Route>
      </Router>
    );
  });

  it("uses the pathSetter provided", async () => {
    const updatePath = vi.fn();
    const user = userEvent.setup();
    render(
      <Router initialPath="/" updatePath={updatePath}>
        <Route path="/">
          <Link to="/foo">go</Link>
        </Route>
      </Router>
    );

    user.click(screen.getByRole("link", { name: "go" }));

    await waitFor(() => {
      expect(updatePath).toHaveBeenCalledWith("/foo");
    });
  });
});
