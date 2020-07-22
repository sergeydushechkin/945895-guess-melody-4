import {reducer, ActionCreator, ActionType} from "./game.js";


it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    step: -1,
    mistakes: 0,
    maxMistakes: 3,
  });
});

it(`Reducer should increment current step by a given value`, () => {
  expect(reducer({
    step: -1,
    mistakes: 0,
  }, {
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  })).toEqual({
    step: 0,
    mistakes: 0,
  });

  expect(reducer({
    step: -1,
    mistakes: 0,
  }, {
    type: ActionType.INCREMENT_STEP,
    payload: 0,
  })).toEqual({
    step: -1,
    mistakes: 0,
  });
});

it(`Reducer should increment number of mistakes by a given value`, () => {
  expect(reducer({
    step: -1,
    mistakes: 0,
  }, {
    type: ActionType.INCREMENT_MISTAKES,
    payload: 1,
  })).toEqual({
    step: -1,
    mistakes: 1,
  });

  expect(reducer({
    step: -1,
    mistakes: 0,
  }, {
    type: ActionType.INCREMENT_MISTAKES,
    payload: 0,
  })).toEqual({
    step: -1,
    mistakes: 0,
  });
});

it(`Reducer should return default`, () => {
  expect(reducer({
    step: 5,
    mistakes: 1,
  }, {
    type: ActionType.RESET,
    payload: null,
  })).toEqual({
    step: 0,
    mistakes: 0,
    maxMistakes: 3,
  });

  expect(reducer({
    step: 0,
    mistakes: 0,
  }, {
    type: ActionType.RESET,
    payload: null,
  })).toEqual({
    step: 0,
    mistakes: 0,
    maxMistakes: 3,
  });

  expect(reducer({
    step: -1,
    mistakes: 0,
  }, {
    type: ActionType.RESET,
    payload: null,
  })).toEqual({
    step: 0,
    mistakes: 0,
    maxMistakes: 3,
  });
});

it(`Reducer should return step -1`, () => {
  expect(reducer({
    step: 5,
    mistakes: 1,
  }, {
    type: ActionType.GO_TO_WELCOME,
    payload: null,
  })).toEqual({
    step: -1,
    mistakes: 0,
    maxMistakes: 3,
  });

  expect(reducer({
    step: 0,
    mistakes: 0,
  }, {
    type: ActionType.GO_TO_WELCOME,
    payload: null,
  })).toEqual({
    step: -1,
    mistakes: 0,
    maxMistakes: 3,
  });

  expect(reducer({
    step: -1,
    mistakes: 0,
  }, {
    type: ActionType.GO_TO_WELCOME,
    payload: null,
  })).toEqual({
    step: -1,
    mistakes: 0,
    maxMistakes: 3,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for incrementing step returns correct action`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    });
  });

  it(`Action creator for incrementing mistake returns action with 0 payload if answer for artist is correct`, () => {
    expect(ActionCreator.incrementMistake({
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``,
      },
      answers: [
        {
          artist: `correct`,
          picture: ``,
        }, {
          artist: `incorrect`,
          picture: ``,
        }, {
          artist: `incorrect-2`,
          picture: ``,
        },
      ]
    }, {
      artist: `correct`,
      picture: ``,
    })).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 payload if answer for artist is incorrect`, () => {
    expect(ActionCreator.incrementMistake({
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``,
      },
      answers: [
        {
          artist: `correct`,
          picture: ``,
        }, {
          artist: `incorrect`,
          picture: ``,
        }, {
          artist: `incorrect-2`,
          picture: ``,
        },
      ]
    }, {
      artist: `incorrect`,
      picture: ``,
    })).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    });
  });

  it(`Action creator for incrementing mistake returns action with 0 payload if answer for genre is correct`, () => {
    expect(ActionCreator.incrementMistake({
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `rock`,
          src: ``,
        }, {
          genre: `jazz`,
          src: ``,
        }, {
          genre: `blues`,
          src: ``,
        }, {
          genre: `blues`,
          src: ``,
        },
      ]
    }, [false, true, false, false])).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 payload if answer for genre is incorrect`, () => {
    expect(ActionCreator.incrementMistake({
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `blues`,
          src: ``,
        }, {
          genre: `blues`,
          src: ``,
        }, {
          genre: `blues`,
          src: ``,
        }, {
          genre: `blues`,
          src: ``,
        },
      ]
    }, [true, true, true, true])).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    });
  });

  it(`Action creator for reset game returns action with null payload`, () => {
    expect(ActionCreator.resetGame())
      .toEqual({
        type: ActionType.RESET,
        payload: null,
      });
  });

  it(`Action creator for go to welcome returns action with null payload`, () => {
    expect(ActionCreator.goToWelcome())
      .toEqual({
        type: ActionType.GO_TO_WELCOME,
        payload: null,
      });
  });
});
