import { MessageBox } from 'element-ui'
import './MessageBox.css'

function confirm () {
    return upgradeMessageBox(MessageBox.confirm, arguments, 2)
}

function alert () {
    return upgradeMessageBox(MessageBox.alert, arguments, 2)
}

function message () {
    let messageBox = MessageBox
    return upgradeMessageBox(messageBox, arguments, 0)
}

function upgradeMessageBox (target, args, optionIndex) {
    if (args[optionIndex]) {
        args[optionIndex].customClass = args[optionIndex].customClass || 'my-msg-box'
    }
    return target.apply(this, args)
}

export default {
    confirm,
    alert,
    message
}