import {body} from 'express-validator'

// ? Register

export const registerValidation = [
    body('fullName', 'Укажите имя').isLength({min:3}),
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min:5}),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional()
];

// ? Авторизация

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min:5}),
]