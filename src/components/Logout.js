export function Logout(props) {

    return(
        <button className="header__user-exit" onClick={props.onSignOut}>Выйти</button>
    )
}