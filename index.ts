type OpenArgument = '{'
type CloseArgument = '}'

type GenerateArgument<Arg extends string> = Record<Arg, string>

type RemoveArg<Text, Arg extends string> = Text extends `${Arg}${infer Rest}`
 ? Rest
 : ''

type GetArg<Text, Arg extends string = ''> = Text extends `${CloseArgument}${infer Rest}`
 ? Arg
 : Text extends `${infer First}${infer Second}`
    ? GetArg<Second, `${Arg}${First}`>
    : never

type GetArgs<Text extends string, Args = {}> = Text extends ''
  ? Args
  : Text extends `${OpenArgument}${infer Rest}`
    ? GetArgs<RemoveArg<Rest, `${GetArg<Rest>}${CloseArgument}`>, Args & GenerateArgument<GetArg<Rest>>>
    : Text extends `${infer First}${infer Second}`
      ? GetArgs<Second, Args>
      : GetArgs<'', Args>

type Intl<T extends string> = GetArgs<T>

const removeArg: RemoveArg<'who}', 'who}'> = ""

const removeOneArg: RemoveArg<'greeting} {who}', 'greeting}'> = " {who}"

const getArg: GetArg<'greeting} {who}'> = "greeting"

const a: Intl<'Hello'> = {}

const b: Intl<'Hello {who}'> = {
  who: 'world'
}

const c: Intl<'{greeting} world'> = {
  greeting: 'world'
}

const d: Intl<'{greeting} {who}'> = {
  greeting: 'world',
  who: '',
}