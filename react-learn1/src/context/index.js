import React from 'react'

export const ThemeContext = React.createContext()
export const NameContext = React.createContext()

export const ThemeProvider = ThemeContext.Provider
export const NameProvider = NameContext.Provider

export const ThemeConsumer = ThemeContext.Consumer
export const NameConsumer = NameContext.Consumer