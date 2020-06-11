function change_x (amount: number) {
    if (!(b_flashing_labels)) {
        active_X.value += amount
        if (slider_velocity_X.selected) {
            mySprite.vx += amount
        } else {
            mySprite.ax += amount
        }
    }
}
function select_velocity_sliders () {
    set_active_selected(false)
    active_X = slider_velocity_X
    active_Y = slider_velocity_y
    set_active_selected(true)
    slider_labels("v")
}
function change_y (amount: number) {
    if (!(b_flashing_labels)) {
        active_Y.value += amount
        if (slider_velocity_y.selected) {
            mySprite.vy += 0 - amount
        } else {
            mySprite.ay += 0 - amount
        }
    }
}
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    change_x(1)
})
function set_active_selected (is_selected: boolean) {
    active_X.selected = is_selected
    active_Y.selected = is_selected
}
controller.down.onEvent(ControllerButtonEvent.Repeated, function () {
    change_y(-1)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    change_x(-1)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    change_y(-1)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (slider_velocity_X.selected) {
        select__accelerationD_Slides()
    } else {
        select_velocity_sliders()
    }
})
function select__accelerationD_Slides () {
    set_active_selected(false)
    active_X = slider_acceleration_X
    active_Y = slider_acceleration_Y
    set_active_selected(true)
    slider_labels("a")
}
function show_all_labels () {
    b_flashing_labels = true
    slider_velocity_X.thumb_sprite.say("vx")
    slider_velocity_y.thumb_sprite.say("vy")
    slider_acceleration_X.thumb_sprite.say("ax")
    slider_acceleration_Y.thumb_sprite.say("ay")
    pause(2000)
    b_flashing_labels = false
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    change_x(1)
})
controller.up.onEvent(ControllerButtonEvent.Repeated, function () {
    change_y(1)
})
function make_sprites () {
    mySprite = sprites.create(img`
2 2 2 2 
2 5 5 2 
2 5 5 2 
2 2 2 2 
`, SpriteKind.Player)
    mySprite.setFlag(SpriteFlag.BounceOnWall, true)
    mySprite.z = 2
    mySprite.startEffect(effects.trail)
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    change_y(1)
})
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    change_x(-1)
})
function slider_labels (label: string) {
    b_flashing_labels = true
    active_X.thumb_sprite.say("" + label + "x")
    active_Y.thumb_sprite.say("" + label + "y")
    pause(1000)
    b_flashing_labels = false
}
let mySprite: Sprite = null
let b_flashing_labels = false
let active_Y: Slider = null
let active_X: Slider = null
let slider_acceleration_Y: Slider = null
let slider_acceleration_X: Slider = null
let slider_velocity_y: Slider = null
let slider_velocity_X: Slider = null
make_sprites()
slider_velocity_X = slider.create(0, -100, 100, 100, 6, Orientation.Horizontal)
slider_velocity_y = slider.create(0, -100, 100, 6, 100, Orientation.Vertical)
slider_velocity_y.left = 3
slider_acceleration_X = slider.create(0, -100, 100, 100, 6, Orientation.Horizontal)
slider_acceleration_X.top = 14
slider_acceleration_Y = slider.create(0, -100, 100, 6, 100, Orientation.Vertical)
slider_acceleration_Y.left = 150
show_all_labels()
active_X = slider_velocity_X
active_Y = slider_velocity_y
set_active_selected(true)
b_flashing_labels = false
game.onUpdate(function () {
    if (!(b_flashing_labels)) {
        slider_velocity_X.value = Math.round(mySprite.vx)
        slider_velocity_y.value = 0 - Math.round(mySprite.vy)
        slider_acceleration_X.value = Math.round(mySprite.ax)
        slider_acceleration_Y.value = 0 - Math.round(mySprite.ay)
    }
})
