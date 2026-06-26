export default class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "bce9eff9-056a-4a65-8f13-41f8749fd43e",
      },
    }).then((res) => res.json());
  }

  // other methods for working with the API
}
