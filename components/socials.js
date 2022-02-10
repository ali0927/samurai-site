const Social = (type, link) =>
  function Social({ anchorClass, iconClass, style }) {
    return (
      <a className={anchorClass} href={link} target="_blank" rel="noreferrer">
        <i className={`bi bi-${type} ${iconClass}`} style={style ?? {}}></i>
      </a>
    );
  };

const Discord = Social("discord", "https://discord.gg/shogunsamurais");
const Twitter = Social("twitter", "https://twitter.com/ShogunSamurais");

Discord.displayName = "Discord";
Twitter.displayName = "Twitter";

export { Discord, Twitter };
