const messageBox = $('#messageBox')
const peselInput = $('#peselInput')
const birthdayInput = $('#birthdayInput')
const genderInput = $('#genderInput')
const serialNumberInput = $('#serialNumberInput')
const checksumInput = $('#checksumInput')

$(() => {
    $('#checkPeselButton').on('click', (e) => {
        e.preventDefault()
        const pesel = new PeselValidator(peselInput.val())
        pesel.validate()
        messageBox.empty()
        cleanFields()
        if (pesel.isValid) {
            messageBox.append(
                `<span class="message--positive">Pesel is correct.</span>`
            )
            birthdayInput.val(pesel.getBirthDate())
            genderInput.val(pesel.getGender())
            serialNumberInput.val(pesel.getSerialNumber())
            checksumInput.val(pesel.getChecksum())
        } else {
            pesel.errors.forEach((errorMsg) => {
                messageBox.append(
                    `<span class="message--error">- ${errorMsg}</span>`
                )
            })
        }
    })
})

const cleanFields = () => {
    const fieldsToClean = [
        birthdayInput,
        genderInput,
        serialNumberInput,
        checksumInput,
    ]
    fieldsToClean.forEach((field)=>{
        field.val('')
    })
}