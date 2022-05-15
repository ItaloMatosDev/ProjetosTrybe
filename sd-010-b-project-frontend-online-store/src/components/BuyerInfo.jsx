import React, { Component } from 'react';

export default class BuyerInfo extends Component {
  render() {
    return (
      <div>
        <form>
          <h3>Informações do comprador</h3>
          <input
            type="text"
            name="name"
            placeholder="Nome Completo"
            data-testid="checkout-fullname"
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            data-testid="checkout-email"
          />
          <input
            type="string"
            name="cpf"
            placeholder="CPF"
            data-testid="checkout-cpf"
          />
          <input
            type="string"
            name="phone"
            placeholder="Telefone"
            data-testid="checkout-phone"
          />
          <input
            type="string"
            name="cep"
            placeholder="CEP"
            data-testid="checkout-cep"
          />
          <input
            type="text"
            name="address"
            placeholder="Endereço"
            data-testid="checkout-address"
          />
        </form>
      </div>
    );
  }
}
