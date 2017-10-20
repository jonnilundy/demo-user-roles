import handlebars from 'handlebars';
import {readFileSync} from 'fs';

/**
 * Sign Up Route
 * @param  {Request} req 
 * @param  {Response} res
 * @param  {Function} next
 */
export async function signup(req, res, next) {
  const source = readFileSync('./pages/signup.html').toString();
  const template = handlebars.compile(source);
  const html = template({title: 'Sign Up'});
  res.send(html);
}
