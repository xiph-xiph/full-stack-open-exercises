import { beforeEach, describe, test, expect, afterAll } from '@playwright/test'
import { after } from 'node:test'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Mr. Test',
        username: 'tester42',
        password: 'testpass'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Username')).toBeVisible()
    await expect(page.getByText('Password')).toBeVisible()
    await expect(page.getByText('Login')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('tester42')
      await page.getByRole('textbox').last().fill('testpass')
      await page.getByRole('button', { name: 'Login' }).click()
      await expect(page.getByText('Mr. Test is logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('tester42')
      await page.getByRole('textbox').last().fill('invalidpassword')
      await page.getByRole('button', { name: 'Login' }).click()
      await expect(page.getByText('Invalid username and/or password')).toBeVisible()
      await expect(page.getByText('Mr. Test is logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('textbox').first().fill('tester42')
      await page.getByRole('textbox').last().fill('testpass')
      await page.getByRole('button', { name: 'Login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'Add new blog' }).click()
      await page.getByText('Title:').getByRole('textbox').fill('My Test Blog For Testing')
      await page.getByText('Author:').getByRole('textbox').fill('John Cena')
      await page.getByText('URL:').getByRole('textbox').fill('www.testblog.com')
      await page.getByRole('button', { name: 'Create' }).click()

      await expect(page.getByText('New blog "My Test Blog For Testing" by John Cena added.')).toBeVisible()
      await expect(page.getByRole('button', { name: 'Create' })).not.toBeVisible()
      await expect(page.getByRole('button', { name: 'Add new blog' })).toBeVisible()
      await expect(page.getByText('My Test Blog For Testing John Cena')).toBeVisible()
    })

    describe('and a blog is created', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'Add new blog' }).click()
        await page.getByText('Title:').getByRole('textbox').fill('My Test Blog For Testing')
        await page.getByText('Author:').getByRole('textbox').fill('John Cena')
        await page.getByText('URL:').getByRole('textbox').fill('www.testblog.com')
        await page.getByRole('button', { name: 'Create' }).click()
      })

      test('the blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'Show' }).click()
        await page.getByRole('button', { name: 'Like' }).click()
        await expect(page.getByText('likes: 1')).toBeVisible()
        await page.getByRole('button', { name: 'Like' }).click()
        await expect(page.getByText('likes: 2')).toBeVisible()
      })

      test('the blog can be removed', async ({ page }) => {
        await page.getByRole('button', { name: 'Show' }).click()
        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'Remove' }).click()
        await expect(page.getByText('My Test Blog For Testing John Cena')).not.toBeVisible()
      })

      test('the blog can not be removed if it belongs to another user', async ({ page, request }) => {
        await request.post('http://localhost:3003/api/users', {
          data: {
            name: 'Mr. Test 2',
            username: 'tester24',
            password: 'passtest'
          }
        })
        await page.getByRole('button', { name: 'Logout' }).click()
        await page.getByRole('textbox').first().fill('tester24')
        await page.getByRole('textbox').last().fill('passtest')
        await page.getByRole('button', { name: 'Login' }).click()

        await page.getByRole('button', { name: 'Show' }).click()
        await expect(page.getByRole('button', { name: 'Remove' })).not.toBeVisible()
      })
    })

    test('Blogs are sorted by amount of likes', async ({ page }) => {
      await page.getByRole('button', { name: 'Add new blog' }).click()
      await page.getByText('Title:').getByRole('textbox').fill('My First Test Blog For Testing')
      await page.getByText('Author:').getByRole('textbox').fill('John Cena')
      await page.getByText('URL:').getByRole('textbox').fill('www.testblog1.com')
      await page.getByRole('button', { name: 'Create' }).click()

      await page.getByRole('button', { name: 'Add new blog' }).click()
      await page.getByText('Title:').getByRole('textbox').fill('My Second Test Blog For Testing')
      await page.getByText('Author:').getByRole('textbox').fill('Cena John')
      await page.getByText('URL:').getByRole('textbox').fill('www.testblog2.com')
      await page.getByRole('button', { name: 'Create' }).click()

      await page.getByRole('button', { name: 'Add new blog' }).click()
      await page.getByText('Title:').getByRole('textbox').fill('My Third Test Blog For Testing')
      await page.getByText('Author:').getByRole('textbox').fill('You Can\'t See Me')
      await page.getByText('URL:').getByRole('textbox').fill('www.testblog3.com')
      await page.getByRole('button', { name: 'Create' }).click()

      await page.getByRole('button', { name: 'Show' }).first().click()
      await page.getByRole('button', { name: 'Show' }).first().click()
      await page.getByRole('button', { name: 'Show' }).click()

      await page.getByRole('button', { name: 'Like' }).last().click()
      await page.waitForTimeout(300)
      await page.getByRole('button', { name: 'Like' }).last().click()
      await page.waitForTimeout(300)
      await page.getByRole('button', { name: 'Like' }).last().click()
      await page.waitForTimeout(300)
      await page.getByRole('button', { name: 'Like' }).last().click()

      await expect(page.getByText('likes: 2')).toBeVisible()
      await expect(page.getByText('likes: 1')).toHaveCount(2)
    })
  })
})

afterAll(async ({ request }) => {
  await request.post('http://localhost:3003/api/testing/reset')
})