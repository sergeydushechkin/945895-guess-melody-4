import * as React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import GameOverScreen from "./game-over-screen";
import history from "../../history";

it(`Should GameOverScreen render correctly`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <GameOverScreen
            onReplayButtonClick={() => {}}
          />
        </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
