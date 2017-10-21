import handlebars from 'handlebars';
import {readFileSync} from 'fs';

/**
 * Login Route
 * @param  {Request} req
 * @param  {Response} res
 * @param  {Function} next
 */
export async function login(req, res, next) {
  const source = readFileSync('./pages/index.html').toString();
  const template = handlebars.compile(source);
  const html = template({title: 'Sign In'});
  res.send(html);
}
