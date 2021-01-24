export interface HighscoreEntry {
  _id: string;
  name: string;
  score: number;
}

const url = "https://snakeou-d554.restdb.io/rest/score";
const request = (httpMethod: string) => {
  return {
    method: httpMethod,
    headers: {
      "cache-control": "no-cache",
      "x-apikey": "600d719f1346a1524ff12d97",
      "content-type": "application/json",
    },
    json: true,
  };
};

export async function getHighscoreList(): Promise<HighscoreEntry[]> {
  const response = await fetch(url + "?sort=score&dir=-1", request("GET"));
  return response.json();
}

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
