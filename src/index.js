import main from "./assets/scripts/main.js"

async function enableMocking() {
  if (process.env.NODE_ENV != "production" && process.env.ENABLE_MOCK_API == "true") {

    const { worker } = await import("./mocks/browser.js");
    await worker.start({
      onUnhandledRequest: "bypass"
    })
  }
}

enableMocking()
  .then(() => {
    main.init()
  })
  .catch((err) => {
    main.init()
  })
