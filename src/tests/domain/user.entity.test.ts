import { UserEntity, UserEntityProps } from '../../domain/entities/user.entity';



describe('UserEntity', () => {
    it('should allow creation of a UserEntity', () => {
        const userProps: UserEntityProps = {
          id: '12345',
          name: 'John Doe',
          gender: 'male',
          dateOfBirth: new Date('1990-01-01'),
          email: 'john.doe@example.com',
          password: 'SecurePassword123',
        };
    
        const userEntity = new UserEntity(userProps);
    
        expect(userEntity.user).toEqual(userProps);
      });


  it('should create a UserEntity with correct properties', () => {
    const userProps: UserEntityProps = {
      id: '12345',
      name: 'John Doe',
      gender: 'male',
      dateOfBirth: new Date('1990-01-01'),
      email: 'john.doe@example.com',
      password: 'SecurePassword123',
    };

    const userEntity = new UserEntity(userProps);

    expect(userEntity.user.id).toBe('12345');
    expect(userEntity.user.name).toBe('John Doe');
    expect(userEntity.user.gender).toBe('male');
    expect(userEntity.user.dateOfBirth).toEqual(new Date('1990-01-01'));
    expect(userEntity.user.email).toBe('john.doe@example.com');
    expect(userEntity.user.password).toBe('SecurePassword123');
  });

  it('should throw an error if invalid gender is provided', () => {
    const invalidUserProps = {
      id: '12345',
      name: 'Jane Doe',
      gender: 'invalido' as 'male',
      dateOfBirth: new Date('1990-01-01'),
      email: 'jane.doe@example.com',
      password: 'SecurePassword123',
    };

    expect(() => new UserEntity(invalidUserProps)).toThrow();
  });

  it('should throw an error if dateOfBirth is not a Date object', () => {
    const invalidUserProps: Omit<UserEntityProps, 'dateOfBirth'> & { dateOfBirth: any } = {
      id: '123',
      name: 'John Doe',
      gender: 'male',
      dateOfBirth: 'not-a-date', // Valor inválido
      email: 'john.doe@example.com',
      password: 'password123',
    };

    expect(() => new UserEntity(invalidUserProps)).toThrow();
  });


});


