const { clamp } = require('ramda')

const OBJECTIVE = 100.0

const INITIAL_STATE = 0.0

let state = INITIAL_STATE

let states = []
let actions = []
let rewards = []

const NUMBER_OF_ITERATIONS = 300

const act = (states, actions, rewards, i) => {
  if (i === 0) {
    const sign = Math.random() > 0.5
    const value = Math.random()
    return sign ? value : value * -1
  }

  if (rewards[rewards.length - 1] === -1) {
    return 0
  }

  const biggestReward = Math.max.apply(null, rewards)
  const biggestRewardIdx = rewards.indexOf(biggestReward)

  const sign = Math.random() > 0.5
  const value = Math.random() / 10
  const rng = sign ? value : value * -1

  return clamp(-1, 1, actions[biggestRewardIdx] + rng)
}

const calculateNewState = (lastState, action) =>
  lastState + action

const toAward = (state, action) => {
  if (state > 100) {
    return -1
  }

  return action // between -1 and 1
}

const iteration = (states, actions, rewards, i) => {
  const action = act(states, actions, rewards, i)
  const state = calculateNewState(states[states.length - 1] || INITIAL_STATE, action)
  const reward = toAward(state, action)

  return {
    states: [...states, state],
    actions: [...actions, action],
    rewards: [...rewards, reward],
  }
}

for (let i = 0; i <= NUMBER_OF_ITERATIONS; i++) {
  const iterationData = iteration(states, actions, rewards, i)

  states = iterationData.states
  actions = iterationData.actions
  rewards = iterationData.rewards
}

console.log('----------FINAL------------')
console.log('state', states[states.length - 1])
