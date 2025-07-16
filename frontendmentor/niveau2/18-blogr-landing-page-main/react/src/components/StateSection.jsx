import phonesImg from '../assets/illustration-phones.svg';

export default function StateSection() {
  return (
    <section className="state">
      <div className="state-left">
        <img src={phonesImg} alt="illustration-phones" />
      </div>
      <div className="state-right">
        <h3>State of the Art Infrastructure</h3>
        <p>
          With reliability and speed in mind, worldwide data centers provide the backbone for ultra-fast connectivity.
          This ensures your site will load instantly, no matter where your readers are, keeping your site competitive.
        </p>
      </div>
    </section>
  );
}