import { beforeEach, describe, test, expect } from '@playwright/test'

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
      await page.getByRole('button', { name:'Login' }).click()
      await expect(page.getByText('Mr. Test is logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('tester42')
      await page.getByRole('textbox').last().fill('invalidpassword')
      await page.getByRole('button', { name:'Login' }).click() 
      await expect(page.getByText('Invalid username and/or password')).toBeVisible()
      await expect(page.getByText('Mr. Test is logged in')).not.toBeVisible()
    })
  })
})