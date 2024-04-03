function getCreateUserResponseDTO(user) {
    return {
        message: 'Success create user',
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }
};


module.exports = {
    getCreateUserResponseDTO
}