import Client from "../models/Client.js";
import { cnpjValidation, emailValidation } from './validations.js';

export function clientValidation(res, razaoSocial, nomeFantasia, CNPJ, email, telefone) {

    if (!razaoSocial)
        return res.status(400).json({ msg: 'Razão social is required', valid: false });

    if (!nomeFantasia)
        return res.status(400).json({ msg: 'Nome fantasia is required', valid: false });

    if (!CNPJ)
        return res.status(400).json({ msg: 'CNPJ is required', valid: false });

    if (!cnpjValidation(CNPJ))
        return res.status(400).json({ msg: 'Invalid CNPJ. Please enter a valid CNPJ.', valid: false });

    if (!email)
        return res.status(400).json({ msg: 'E-mail is required', valid: false });

    if (!emailValidation(email))
        return res.status(400).json({ msg: 'Invalid e-mail. Please enter a valid e-mail.', valid: false });

    if (!telefone || telefone.length < 8)
        return res.status(400).json({ msg: 'Telefone is required and must be at least eight characters long.', valid: false });

    return { valid: true }
}

export async function ifExistsCreate(res, razaoSocial, nomeFantasia, CNPJ, email, telefone) {

    let clients = await Client.find({ $or: [{ razaoSocial: razaoSocial }, { nomeFantasia: nomeFantasia }, { CNPJ: CNPJ }, { email: email }, { telefone: telefone }] });

    if (clients.length > 0) {

        if (clients.findIndex(i => i.razaoSocial === razaoSocial) !== -1)
            return res.status(400).json({ msg: 'This razao social already registered!', valid: false });

        if (clients.findIndex(i => i.nomeFantasia === nomeFantasia) !== -1)
            return res.status(400).json({ msg: 'This nome fantasia already registered!', valid: false });

        if (clients.findIndex(i => i.CNPJ === CNPJ) !== -1)
            return res.status(400).json({ msg: 'This CNPJ already registered!', valid: false });

        if (clients.findIndex(i => i.email === email) !== -1)
            return res.status(400).json({ msg: 'This e-mail already registered!', valid: false });
    }

    return { valid: true }
}

export async function ifExistsUpdate(res, razaoSocial, nomeFantasia, CNPJ, email, telefone, id) {

    let clients = await Client.find({ $or: [{ razaoSocial: razaoSocial }, { nomeFantasia: nomeFantasia }, { CNPJ: CNPJ }, { email: email }, { telefone: telefone }] });

    let actually = await Client.findOne({ _id: id });

    if (clients.length > 0) {

        if (clients.findIndex(i => i.razaoSocial === razaoSocial && actually.razaoSocial !== razaoSocial) !== -1)
            return res.status(400).json({ msg: 'This razao social already registered!', valid: false });

        if (clients.findIndex(i => i.nomeFantasia === nomeFantasia && actually.nomeFantasia !== nomeFantasia) !== -1)
            return res.status(400).json({ msg: 'This nome fantasia already registered!', valid: false });

        if (clients.findIndex(i => i.CNPJ === CNPJ && actually.CNPJ !== CNPJ) !== -1)
            return res.status(400).json({ msg: 'This CNPJ already registered!', valid: false });

        if (clients.findIndex(i => i.email === email && actually.email !== email) !== -1)
            return res.status(400).json({ msg: 'This e-mail already registered!', valid: false });

    }

    return { valid: true }
}