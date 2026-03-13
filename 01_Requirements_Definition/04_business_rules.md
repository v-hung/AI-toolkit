# Business Rules

## Overview

Các quy tắc nghiệp vụ áp dụng cho hệ thống.

## Rules List

| Rule ID | Rule Description                | Example        |
| ------- | ------------------------------- | -------------- |
| BR-01   | User phải >= 18 tuổi            | DOB validation |
| BR-02   | Order > $100 được free shipping |                |

## Validation Rules

| Field    | Rule            |
| -------- | --------------- |
| Email    | Must be unique  |
| Password | >= 8 characters |

## Calculation Rules

| Rule     | Formula      |
| -------- | ------------ |
| Discount | price \* 0.1 |

## Exception Handling

- Rule conflict handling
