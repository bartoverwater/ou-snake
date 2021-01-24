/** @module highscore */

/**
 * @desc Interface used to represent the highscore data.
 *
 * @export
 * @interface HighscoreEntry
 */
export interface HighscoreEntry {
  _id: string | null;
  name: string;
  score: number;
}

/** Database rest api */
const url = "https://snakeou-d554.restdb.io/rest/score";

/**
 * @function request(httpMethod) -> void
 * @desc Helper method to easily create requests. Contains header with the api key
 *
 * @param {string} httpMethod The http request method (GET|POST|PUT|PATCH|DELETE)
 */
function request(httpMethod: string) {
  return {
    method: httpMethod,
    headers: {
      "cache-control": "no-cache",
      "x-apikey": "600d719f1346a1524ff12d97",
      "content-type": "application/json",
    },
    json: true,
  };
}

/**
 * @desc Retrieves all scores from the database, sorted descending by score.
 * @function getHighscoreList() -> Promise<HighscoreEntry[]>
 * @export
 * @return {Promise<HighscoreEntry[]>} A promise containing all scores from the database.
 */
export async function getHighscoreList(): Promise<HighscoreEntry[]> {
  const response = await fetch(url + "?sort=score&dir=-1", request("GET"));
  return response.json();
}

/**
 * @desc Inserts new scores into the database. Creates a new entry if the playername is unknown, updates the database entry when the
 * playername is known and the new score is higher than the old score.
 * @function insertScore(newEntry,andThen) => void
 * @export
 * @param {HighscoreEntry} newEntry The new score of the player with playername.
 * @param {function} andThen The function to call when the database is updated.
 */
export function insertScore(
  newEntry: HighscoreEntry,
  andThen: () => void
): void {
  fetch(url + '?q={"name": "' + newEntry.name + '"}', request("GET"))
    .then((data) => data.json())
    .then((data) => {
      if (data.length == 0) {
        fetch(url, { ...request("POST"), body: JSON.stringify(newEntry) }).then(
          andThen
        );
      } else if (data[0].score < newEntry.score) {
        fetch(url + "/" + data[0]._id, {
          ...request("PUT"),
          body: JSON.stringify(newEntry),
        }).then(andThen);
      }
    });
}
