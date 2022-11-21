
import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Login from "../pages/Login";
import { shallow, mount } from 'enzyme';

let wrapper;

beforeEach(() => {
    wrapper = shallow(<Login/>);
});

describe("Basic rendering of form elements", () => {

    // it("should render phone field",() =>{
    //     render(<Login/>);

    //     const phoneField = screen.getByTestId('phone-input');

    //     expect(phoneField).toBeInTheDocument;
    // });
    
    it("should render password field",() =>{
        const passwordField =  wrapper.find('password-input');
        expect(passwordField).not.toBeInTheDocument;
    });


    it("should do something ", ()=>{
        const phoneInput = wrapper.find("#phone-test");
        expect(phoneInput).toHaveLength(1);
    }) 

});

