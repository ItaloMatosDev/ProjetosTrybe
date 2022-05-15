import React, { Component } from 'react';

export default class PaymentMethods extends Component {
  render() {
    return (
      <div>
        <h3>Métodos de pagamento</h3>
        <div>
          <label htmlFor="boleto">
            Boleto:
            <input type="radio" name="boleto" id="boleto" />
          </label>
          <label htmlFor="card">
            Visa:
            <input type="radio" name="card" id="visa" />
            Mastercard:
            <input type="radio" name="card" id="mastercard" />
            Elo:
            <input type="radio" name="card" id="elo" />
          </label>
        </div>
      </div>
    );
  }
}
