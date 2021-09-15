
import withSession from '../../lib/session'; 
import database from '../../lib/dbConnection';
import { validateMany } from './validate';
import { hashSync } from 'bcryptjs';

export default withSession(async (req, res) => {
  const user = req.session.get('user');
  if (user) {
    return res.json({
      isLoggedIn: true,
      ...user,
    });
  } 
  if(!user) { 
    const { isValid, fieldName } = validateMany(req.body);
    if(isValid){
      const db = await database();
      await db.collection('users').createIndex({ "email": 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });
      const { firstName, lastName, email, password } = req.body; // Destructure so they cannot enter extra fields
      const hashedPassword = hashSync(password, 14) // We can increase salting rounds for more security
      try {
        const { insertedId } = await db.collection('users').insertOne({ firstName, lastName, email, password: hashedPassword });
        const user = {
          firstName,
          lastName,
          email
        }
        req.session.set('user', user);
        await req.session.save();
        return res.json({
          isLoggedIn: true,
          ...user
        });
      } catch ( err ) {
        if(err.code === 11000){
          return res.json({ isValid: false, fieldName: 'email', message: 'Email already exists' });
        } else {
          return res.json({ isValid: false, message: 'Unknown error happened' });
        }        
      }
    }
    if(!isValid){
      return res.json({ isValid, fieldName });
    }
  }
});