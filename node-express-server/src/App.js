import logo from "./logo.webp";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> React App with CSP nonce setup using Node Express server</p>
        <p>
          A CSP nonce will be a randomly generated token that we use exactly one
          time.
        </p>
        <p>
          <a
            title="CSP Article"
            href="https://content-security-policy.com/nonce/"
            target="_blank"
          >
            CSP Article
          </a>
        </p>
        <h3>
          <a
            title="Hectane Blog"
            href="https://www.hectane.com/"
            target="_blank"
          >
            Hectane Blog
          </a>
        </h3>
      </header>
    </div>
  );
}

export default App;
