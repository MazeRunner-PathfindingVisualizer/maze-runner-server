const ALGORITHM = require('../constant/algorithm');

function checkAlgorithm(str) {
  if (typeof str !== 'string') {
    return false;
  }

  switch (str.toLowerCase()) {
    case ALGORITHM.DFS:
    case ALGORITHM.BFS:
    case ALGORITHM.DIJKSTRA:
    case ALGORITHM.A_STAR:
    case ALGORITHM.GREEDY_BEST_FIRST_SEARCH:
    case ALGORITHM.SWARM:
    case ALGORITHM.BIDIRECTIONAL_SWARM:
    case ALGORITHM.CONVERGENT_SWARM: {
      return true;
    }
    default: {
      return false;
    }
  }
}

function isValidAlgorithm(algorithms) {
  if (!Array.isArray(algorithms)) {
    return false;
  }

  const result = algorithms.some((algorithm) => !checkAlgorithm(algorithm));

  return !result;
}

function isValidBlock(block) {
  if (!Array.isArray(block)) {
    return false;
  }

  const isRowArray = !block.some((row) => !Array.isArray(row));

  if (!isRowArray) {
    return false;
  }

  let [startNodeCount, endNodeCount, stopoverNodeCount] = [0, 0, 0];

  const result = !block.some((row) =>
    row.some((node) => {
      switch (node) {
        case 0:
        case 1: {
          return false;
        }

        case 2: {
          startNodeCount += 1;
          return startNodeCount >= 2;
        }

        case 3: {
          endNodeCount += 1;
          return endNodeCount >= 2;
        }

        case 4: {
          stopoverNodeCount += 1;
          return stopoverNodeCount >= 2;
        }

        default: {
          return true;
        }
      }
    }),
  );

  return startNodeCount === 1 && endNodeCount === 1 && result;
}

module.exports = { isValidAlgorithm, isValidBlock };
