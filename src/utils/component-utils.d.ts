import React__default from 'react'
import * as react_jsx_runtime from 'react/jsx-runtime'

declare const classes$3: {
  base: string
  outlineRing: string
  size: {
    sm: string
    DEFAULT: string
    lg: string
    xl: string
  }
  dot: {
    size: {
      sm: string
      DEFAULT: string
      lg: string
      xl: string
    }
  }
  rounded: {
    none: string
    sm: string
    md: string
    lg: string
    DEFAULT: string
  }
  variant: {
    solid: {
      base: string
      color: {
        DEFAULT: string
        primary: string
        secondary: string
        success: string
        warning: string
        danger: string
        info: string
      }
    }
    flat: {
      base: string
      color: {
        DEFAULT: string
        primary: string
        secondary: string
        success: string
        warning: string
        danger: string
        info: string
      }
    }
    outline: {
      base: string
      color: {
        DEFAULT: string
        primary: string
        secondary: string
        success: string
        warning: string
        danger: string
        info: string
      }
    }
  }
}
type BadgeProps = {
  /** Change badge color */
  color?: keyof (typeof classes$3.variant)['solid']['color']
  /** The variants of the component are: */
  variant?: keyof typeof classes$3.variant
  /** The size of the component. `"sm"` is equivalent to the dense badge styling. */
  size?: keyof typeof classes$3.size
  /** Render badge as a dot */
  renderAsDot?: boolean
  /** Set a outline ring. It is useful for the overlapping UI. */
  enableOutlineRing?: boolean
  /** The rounded variants are: */
  rounded?: keyof typeof classes$3.rounded
  /** Add custom classes for extra style */
  className?: string
}
/**
 * Badge is a small overlapped UI item which indicates a status, notification, or event that appears in relativity with the underlying object.
 */
declare function Badge({
  renderAsDot,
  size,
  color,
  variant,
  rounded,
  enableOutlineRing,
  children,
  className,
  ...props
}: React__default.PropsWithChildren<BadgeProps>): react_jsx_runtime.JSX.Element
declare namespace Badge {
  var displayName: string
}

declare const titleStyles: {
  h1: string
  h2: string
  h3: string
  h4: string
  h5: string
  h6: string
}
type TitleProps = {
  as?: keyof typeof titleStyles
  className?: string
}
declare function Title({
  as,
  children,
  className,
}: React__default.PropsWithChildren<TitleProps>): react_jsx_runtime.JSX.Element
declare namespace Title {
  var displayName: string
}

declare const classes: {
  p: string
  i: string
  b: string
  q: string
  em: string
  strong: string
  small: string
  span: string
  del: string
  mark: string
  abbr: string
  pre: string
  code: string
  kbd: string
  blockquote: string
  sub: string
  sup: string
}
type TextProps = {
  as?: keyof typeof classes
  title?: string
  className?: string
}
declare function Text({
  as,
  title,
  children,
  className,
}: React__default.PropsWithChildren<TextProps>): react_jsx_runtime.JSX.Element
declare namespace Text {
  var displayName: string
}

export { Badge, BadgeProps, Text, TextProps, Title, TitleProps }
