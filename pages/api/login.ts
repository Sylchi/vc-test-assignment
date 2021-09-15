import withSession from '../../lib/session';
import database from '../../lib/dbConnection';
import { compareSync } from 'bcryptjs';

export default withSession(async (req, res) => {
  const { email: providedEmail, password: providedPassword } = req.body;

  const db = await database();
  
  try {
    const { firstName, lastName, email, password } = await db.collection('users').findOne({ email: providedEmail }, { fields: { firstName: 1, lastName: 1, email: 1, password: 1 }});
    if(!compareSync(providedPassword, password)){
      console.log("wrong password")
      return res.json({ success: false });
    }
    req.session.set('user', {
      firstName,
      lastName,
      email
    });
    await req.session.save();
    return res.json({ success: true });
  } catch (err){
    console.log(err);
    return res.json({ success: false });
  }
});