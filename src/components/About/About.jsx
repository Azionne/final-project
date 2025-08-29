import "./about.css";
import aboutImage from "../../assets/aboutimage.jpg";

export function About() {
  return (
    <section id="about" className="about">
      <div className="about__container">
        <img className="about__image" src={aboutImage} alt="About Azionne" />
        <div className="about__text-content">
          <h2 className="about__title">About the Author</h2>
          <div className="about__description">
            <p className="about__paragraph">
              My name is Azionne Vorric and I am student at TripleTen that
              specializes in software engineering. I am familiar with html, css,
              javascript, node.js and React.
              <br />
              <span style={{ display: "block", marginTop: "16px" }}>
                Blah, blah, blah 😛
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
