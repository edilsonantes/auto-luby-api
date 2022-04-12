import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public static developmentOnly = true
  public async run () {
    await User.create({
      cpf: 41270866885,
      name: 'Edilson',
      email: 'nantes.junior@gmail.com',
      bio: 'Testando o seed de um usuário',
      password: '75tb3piw',
      admin: true
    })

  }
}
