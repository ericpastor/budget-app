Website: https://magnificent-sopapillas-d29267.netlify.app/

# Angular Budget App

![Angular](https://img.shields.io/badge/Angular-v.17-red)
![TypeScript](https://img.shields.io/badge/TypeScript-v.5-blue)
![Css](https://img.shields.io/badge/CSS-purple)

## Introduction

A Project proposed by Integrity Academy to practice first steps with Angular.
In this project, I created a budgeting application using Angular. This app helps users manage their incomes and expenses, track their balance, and save money by setting saving targets.

## Description

In the Budget App, users can:

Record both incomes and expenses.
Check their balance.
Manage the savings:
Set a targeted saving amount.
Transfer money into or out of the savings account.
View their progress towards reaching the saving target.

\*Notice that this app is for studying purposes, the data is stored in LocalStorage, and after clicking RESTART all the data will be lost.

## Workflow

- The first box "Budget-App" contains the title and RESTART button.

- At the second you can set your savings panel by setting a target in euros and the description for which purpose in the money saved.

Once submitted you can see the panel.

Always you can change the setup by clicking "Change your Savings Panel"

<video controls src="box_1_2.mp4" title="Title" controls autoplay loop></video>

<hr>

- Box three "Balance" shows your current

- Balance Box Four "New Transaction" you can do the transactions, give a description, and quantity, and choose between income or expense.

- Once you click on the green arrow it will appear the list of transactions below.

<video controls src="box_3_4.mp4" title="Title" controls autoplay loop></video>

<hr>

- Box five "New transfer". Here is the place where you can transfer money to Savings and to Balance but only allowed if you have a sufficient amount to do it.

<video controls src="box_5.mp4" title="Title" controls autoplay loop></video>

<hr>

## Service Component (managing the data)

In services, data is stored in the local storage,

BudgetApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
