import { tap } from 'rxjs/operators'

export const tapLog = () => tap((event) => console.log(event))
