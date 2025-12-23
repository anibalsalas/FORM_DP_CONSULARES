export type MenuJerList = MenuJer[]

export interface MenuJer {
  id: number
  title: string
  type: string
  routerLink: string
  children: MenuJer[]
}