import { tap } from 'rxjs/operators'

export const log = () => tap((event) => console.log(event))
