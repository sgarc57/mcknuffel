function Newsletter() {
  return (
    <section className="">
      <div className="newsletter container-fluid">
        <div className="card__wraper row">

          <div className="col-5 d-none d-md-block user-select-none">
            <img src="https://github.com/agata604/images/blob/master/lee/newsletter-grey-bg.jpg?raw=true" alt="" className="card__img w-100" />
          </div>

          <div className="card__body col-md-7">
            <div className="text-center">
              <h4 className="card__title">
                Subscribe for Exclusive Sales and Previews
              </h4>
              <p className="card__text">
                Be the first to know about VIP sales and get 10% off your next order!
              </p>
            </div>

            <div className="card__form container-fluid">
              <div className="row">
                <div className="col-md-9 px-md-1 mb-4">
                  <input className="w-100" type="email" name="email" autocomplete="email" placeholder="Please enter your email adress" />
                </div>
                <div className="col-md-3 px-md-1 mb-4">
                  <button className="btn btn--green w-100" type="submit">Subscribe</button>
                </div>
              </div>
              <label for="" className="newsletter-privacy-policy">
                <input type="checkbox" />
                <span className="ms-1">I accept the <a href="#">privacy policy</a></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;