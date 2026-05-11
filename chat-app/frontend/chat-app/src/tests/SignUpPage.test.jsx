import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUpPage from "../pages/SignUpPage";

describe("Signup Page", () => {

  test("renders create account heading", () => {

    render(
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>
    );

   expect(screen.getAllByText(/Create Account/i).length).toBeGreaterThan(0);

  });

});