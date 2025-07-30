import "./about.css";
import { useState } from "react";
import aboutImage from "../../assets/aboutimage.jpg";

export function About() {
  return (
    <section id="about" className="about">
      <div className="about__content-block">
        <img className="about__image" src={aboutImage} alt="About Azionne" />
        <div className="about__content-text">
          <h2 className="about__title">About the Author</h2>
          <div className="about__content">
            <p className="about__paragraph">
              My name is Azionne Vorric and I am student at TripleTen that
              specializes in software engineering. I am familiar with html, css,
              javascript, node.js and React.
            </p>
            <p className="about__paragraph">Blah, blah, blah 😛</p>
          </div>
        </div>
      </div>
    </section>
  );
}
